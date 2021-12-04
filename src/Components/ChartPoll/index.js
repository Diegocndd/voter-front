import { useEffect } from "react";
import Chart from "react-google-charts";
import './styles.css';

function CharPoll(props) {
  const {alternatives} = props;

  useEffect(() => {
    alternatives.unshift(['Alternative', 'Votes']);
  }, [alternatives]);

  return (
    <div id="chart-container">
        <Chart
          id="chart-alternatives"
          height={'300px'}
          chartType="PieChart"
          data={alternatives}
        />
    </div>
  );
}

export default CharPoll;
