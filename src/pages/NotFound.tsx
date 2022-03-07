import PageTitle from "../components/PageTitle";
import MainLayout from "../shared/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <PageTitle title="페이지를 찾을 수 없습니다" />
      <h1>NotFound</h1>
    </MainLayout>
  );
};

export default NotFound;
