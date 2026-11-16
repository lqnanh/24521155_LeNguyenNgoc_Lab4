import { useParams } from "react-router";

export default function PersonDetailPage() {
  const { id } = useParams();

  return (
    <section>
      <h2>Bạn đang ở trang chi tiết của người có mã số {id}</h2>
    </section>
  );
}
