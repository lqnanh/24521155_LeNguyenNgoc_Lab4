import SimpleForm from "../components/form/SimpleForm.jsx";
import styles from "./FormPage.module.css";

function FormPage() {
  return (
    <section className={styles.page} aria-labelledby="form-page-title">
      <h1 id="form-page-title" className={styles.title}>
        Biểu mẫu đăng ký
      </h1>
      <SimpleForm />
    </section>
  );
}

export default FormPage;
