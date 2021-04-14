import React from 'react';
import { firestore } from '../../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const incomeRef = firestore.collection(`income/1/April`);
  const [income] = useCollectionData(incomeRef, { idField: 'id' });
  let salary = 0;
  let pocketMoney = 0;
  if (income) {
    for (let d of income) {
      if (d.incomeCategory === 'salary') {
        salary += Number(d.amount);
      } else {
        pocketMoney += Number(d.amount);
      }
    }
  }
  console.log(salary, pocketMoney);
  const data = {
    labels: ['Salary', 'Pocket Money'],
    datasets: [
      {
        label: '# of Votes',
        data: [salary, pocketMoney],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Pie data={data} width={140} height={40} />
    </div>
  );
};

export default PieChart;
