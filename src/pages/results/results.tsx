import React from "react";

interface ResultsPageProps {
  main?: String;
  sub?: String;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  main,
  sub,
}: ResultsPageProps) => {
  return (
    <div>
      {main} {sub}
    </div>
  );
};

export default ResultsPage;
