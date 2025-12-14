import { Input, Select, Table, Tag, Button, Space, message } from "antd";
import './MatchesPage.styles.css'
import type { Status } from "../../../models/application.model";
import { useApplicationStore } from "../../../stores/application.store";
import { useCandidateStore } from "../../../stores/candidate.store";
import { useEffect, useState } from "react";

const { Search } = Input;

interface Match {
    key: number;
    name: string;
    skills: string[];
    experience: string;
    status: Status;
    location: string;
    match: number;
}


const statusColors: Record<Match["status"], string> = {
    "Applied": "blue",
    "Interviewing": "orange",
    "Offered": "green",
    "Rejected": "red",
    "Hired": "purple",
};


const MatchesPage = () => {
  const [loading, setLoading] = useState(true);
  const [matchesData, setMatchesData] = useState<Match[]>([]);
  const { applications, fetchApplications, updateApplication } = useApplicationStore();
  const { candidates, fetchCandidates } = useCandidateStore();

  const columns = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
    },
    {
        title: "Skills",
        dataIndex: "skills",
        key: "skills",
        render: (skills: string[]) => skills.join(", "),
    },
    {
        title: "Experience",
        dataIndex: "experience",
        key: "experience",
    },
    {
        title: "Location",
        dataIndex: "location",
        key: "location",
    },
    {
        title: "Match",
        dataIndex: "match",
        key: "match",
        render: (match: number) => `${match}%`,
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: Match["status"]) => (
            <Tag color={statusColors[status]} style={{ textTransform: "capitalize" }}>
                {status}
            </Tag>
        ),
    },
    {
        title: "Actions",
        key: "actions",
        render: (_: any, record: Match) => {
            const isActionable = record.status === "Applied";
            return (
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleStatusUpdate(record.key, "Offered")}
                        disabled={!isActionable}
                    >
                        Offer
                    </Button>
                    <Button
                        danger
                        onClick={() => handleStatusUpdate(record.key, "Rejected")}
                        disabled={!isActionable}
                    >
                        Decline
                    </Button>
                </Space>
            );
        },
    },
];

  const handleStatusUpdate = async (applicationId: number, newStatus: Status) => {
    try {

      await updateApplication({
        id: applicationId,
        status: newStatus
      });

      message.success(`Application ${newStatus === 'Offered' ? 'offered' : 'declined'} successfully`);
      await fetchApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
      message.error('Failed to update application status');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch both applications and candidates data
        await Promise.all([
          fetchApplications(),
          fetchCandidates()
        ]);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchApplications, fetchCandidates]);

  useEffect(() => {
    if (applications.length > 0 && candidates.length > 0) {
      const combinedData: Match[] = applications.map(app => {
        // Find corresponding candidate
        const candidate = candidates.find(c => c.id === app.candidateId);
        
        return {
          key: app.id,
          name: candidate ? `${candidate.first_name} ${candidate.last_name}` : 'Unknown',
          skills: candidate?.skills || [],
          experience: `${candidate?.experience_years || 0} years`,
          status: app.status,
          location: candidate?.location || 'Unknown',
          match: app.matchPercent
        };
      });
      setMatchesData(combinedData);
    }
  }, [applications, candidates]);

  return (
    <div>
      <h1>Candidate Matches</h1>
      <p>Review and manage candidates who have applied or been suggested for your open positions.</p>
      <div>
        <Search placeholder="Search candidates..." className="match-search"/>
        <Select 
          className="match-select"
          defaultValue="All Skills"
        />
        <Select 
          className="match-select"
          defaultValue="Any Experience"
        />
      </div>
      <Table<Match> 
        columns={columns} 
        dataSource={matchesData} 
        className="match-table"
        loading={loading}
      />
    </div>
  );
};

export default MatchesPage