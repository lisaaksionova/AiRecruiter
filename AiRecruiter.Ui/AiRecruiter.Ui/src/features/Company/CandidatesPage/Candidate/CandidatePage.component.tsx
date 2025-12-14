import { useParams } from "react-router-dom";
import "./CandidatePage.styles.css";
import { useCandidateStore } from "../../../../stores/candidate.store";
import { Button, Spin } from "antd";
import { useEffect } from "react";

const CandidatePage = () => {
  const { id } = useParams<{ id: string }>();
  const candidate = useCandidateStore((state) => state.candidate);
  const fetchCandidate = useCandidateStore((state) => state.fetchCandidate);
  const loading = useCandidateStore((state) => state.loading);

  useEffect(() => {
    if (id) {
      fetchCandidate(Number(id));
    }
  }, [id, fetchCandidate]);

  if (loading) return <Spin className="spin" tip="Loading candidate..." style={{ marginTop: 50 }} />;

  if (!candidate) return <div>Candidate not found</div>;

  return (
    <div className="candidate">
      <h1>{candidate.first_name} {candidate.last_name}</h1>
      <p>Location: {candidate.location}</p>
      <p>Experience: {candidate.experience_years} years</p>
      <p>Skills: {candidate.skills.join(", ")}</p>
      <Button type="primary">Invite to Interview</Button>
    </div>
  );
};

export default CandidatePage;