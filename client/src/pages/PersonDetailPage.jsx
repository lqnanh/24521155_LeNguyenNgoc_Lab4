import { useParams } from "react-router";

export default function PersonDetailPage() {
  const { personId } = useParams();

  return (
    <section>
      <h1>Bạn đang ở trang chi tiết của người có mã số {personId}</h1>
    </section>
  );
}
