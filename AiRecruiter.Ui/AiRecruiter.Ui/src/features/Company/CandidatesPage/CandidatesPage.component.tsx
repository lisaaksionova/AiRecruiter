import { useEffect, useState } from "react";
import type { Candidate } from "../../../models/candidate.model";
import { useCandidateStore } from "../../../stores/candidate.store";
import { Button, Select, Space, Table, Modal, message, type TableProps, Progress } from "antd";
import "./CandidatePage.component.css";
import { useVacancyStore } from "../../../stores/vacancy.store";
import { stack } from "../../../models/vacancy.model";
import { useApplicationStore } from "../../../stores/application.store";

const CandidatesPage = () => {
    const candidates = useCandidateStore((state) => state.candidates);
    const candidatesLoading = useCandidateStore((state) => state.loading);
    const fetchCandidates = useCandidateStore((state) => state.fetchCandidates);
    const [calculatingScores, setCalculatingScores] = useState(false);
    const fetchMatchScores = useCandidateStore((state) => state.fetchMatchScores);
    
    // Vacancies state
    const { vacancies, fetchVacancies } = useVacancyStore();
    const { createApplication } = useApplicationStore();
    
    // UI state
    const [selectedStack, setSelectedStack] = useState<string | null>(null);
    const [isInviteModalVisible, setIsInviteModalVisible] = useState(false);
    const [selectedVacancyId, setSelectedVacancyId] = useState<number | null>(null);
    const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
    const [candidateMatchScores, setCandidateMatchScores] = useState<Record<string, number>>({});
    const filteredCandidates = selectedStack
        ? candidates.filter((candidate: Candidate) =>
              candidate.skills?.some(
                  (skill: string) => skill.toLowerCase() === selectedStack.toLowerCase()
              )
          )
        : candidates;

    const columns: TableProps<Candidate>["columns"] = [
        {
            title: "Name",
            key: "name",
            render: (_, record: Candidate) => (
                <span>{record.first_name} {record.last_name}</span>
            ),
        },

        {
            title: "Location",
            dataIndex: "location",
            key: "location",
        },
        {
            title: "Experience (Years)",
            dataIndex: "experience_years",
            key: "experience_years",
        },
        {
            title: "Skills",
            dataIndex: "skills",
            key: "skills",
            render: (skills: string[]) => skills?.join(", "),
        },
        {
            title: "Match Scores",
            key: "matchScores",
            render: (_, record: Candidate) => {
                return (
                    <div style={{ maxWidth: '300px' }}>
                        {vacancies.map((vacancy) => {
                            const score = candidateMatchScores[`${record.id}-${vacancy.id}`] || 0;
                            return (
                                <div key={vacancy.id} style={{ marginBottom: '8px' }}>
                                    <div style={{ marginBottom: '4px' }}>{vacancy.title}</div>
                                    <Progress 
                                        percent={score} 
                                        size="small"
                                        status={score >= 70 ? "success" : score >= 40 ? "normal" : "exception"}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record: Candidate) => (
                <Space size="middle">
                    <Button 
                        type="primary"
                        onClick={() => showInviteModal(record.id)}
                    >
                        Invite
                    </Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchCandidates();
        fetchVacancies();
    }, [fetchCandidates, fetchVacancies]);

    // Calculate match scores when candidates or vacancies change
    useEffect(() => {
        let mounted = true;
        const calculateMatchScores = async () => {
            if (!candidates.length || !vacancies.length) return;
            
            try {
                setCalculatingScores(true);
                const scores: Record<string, number> = {};
                const promises = candidates.map(candidate => 
                    Promise.all(vacancies.map(async vacancy => {
                        const score = await fetchMatchScores(vacancy, candidate);
                        return { candidate, vacancy, score };
                    }))
                );

                const results = await Promise.all(promises);
                
                if (!mounted) return;

                results.flat().forEach(({ candidate, vacancy, score }) => {
                    scores[`${candidate.id}-${vacancy.id}`] = score;
                });
                
                setCandidateMatchScores(scores);
            } catch (error) {
                console.error('Error calculating match scores:', error);
            } finally {
                if (mounted) {
                    setCalculatingScores(false);
                }
            }
        };

        calculateMatchScores();
        
        return () => {
            mounted = false;
        };
    }, [candidates.length, vacancies.length, fetchMatchScores]);

    const showInviteModal = (candidateId: number) => {
        setSelectedCandidateId(candidateId);
        setIsInviteModalVisible(true);
    };

    const handleInviteCancel = () => {
        setIsInviteModalVisible(false);
        setSelectedVacancyId(null);
        setSelectedCandidateId(null);
    };

    const handleInviteConfirm = async () => {
        if (!selectedVacancyId || !selectedCandidateId) {
            message.error('Please select a vacancy');
            return;
        }

        try {
            await createApplication({
                vacancyId: selectedVacancyId,
                candidateId: selectedCandidateId,
                status: 2 // Using string literal since Status is a type
            });
            
            message.success('Invitation sent successfully');
            setIsInviteModalVisible(false);
            setSelectedVacancyId(null);
            setSelectedCandidateId(null);
        } catch (error) {
            message.error('Failed to send invitation');
        }
    };

    return (
        <div>
            <h1>Candidates</h1>

            <Select
                className="candidate-select"
                placeholder="Select stack"
                onChange={(value) => setSelectedStack(value)}
                allowClear
                style={{ width: 200, marginBottom: 16 }}
            >
                {stack.map((s) => (
                    <Select.Option key={s.value} value={s.title}>
                        {s.title}
                    </Select.Option>
                ))}
            </Select>

            <Table<Candidate>
                columns={columns}
                dataSource={filteredCandidates}
                className="candidate-table"
                loading={candidatesLoading || calculatingScores}
                rowKey="id"
            />

            <Modal
                title="Invite Candidate"
                open={isInviteModalVisible}
                onOk={handleInviteConfirm}
                onCancel={handleInviteCancel}
                okText="Invite"
                cancelText="Cancel"
            >
                <p>Select a vacancy to invite this candidate:</p>
                <Select
                    style={{ width: '100%' }}
                    placeholder="Select a vacancy"
                    value={selectedVacancyId}
                    onChange={(value) => setSelectedVacancyId(value)}
                >
                    {vacancies.map((vacancy) => (
                        <Select.Option key={vacancy.id} value={vacancy.id}>
                            {vacancy.title}
                        </Select.Option>
                    ))}
                </Select>
            </Modal>
        </div>
    );
};

export default CandidatesPage;
