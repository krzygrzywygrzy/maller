import React from "react";

interface ResultsPageProps {
  main?: String;
  sub?: String;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  main,
  sub,
}: ResultsPageProps) => {
  console.log(main, sub);

  return <div>Results</div>;
};

export default ResultsPage;
