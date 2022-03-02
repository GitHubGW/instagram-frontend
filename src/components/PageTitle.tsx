import { Helmet } from "react-helmet-async";

interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <Helmet>
      <title>{title} • Instagram</title>
    </Helmet>
  );
};

export default PageTitle;
