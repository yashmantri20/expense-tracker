import React, { useContext } from 'react';
import { auth, firestore } from '../../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Pie, Bar } from 'react-chartjs-2';
import { Box, Center } from '@chakra-ui/layout';
import { AppContext } from '../../utils/context';
import { getMonth } from '../../utils/getMonth';

const PieChart = () => {
  const month = getMonth();
  const incomeRef = firestore.collection(
    `income/${auth.currentUser.uid}/${month}`
  );
  const expenseRef = firestore.collection(
    `expense/${auth.currentUser.uid}/${month}`
  );
  const [income] = useCollectionData(incomeRef, { idField: 'id' });
  const [expense] = useCollectionData(expenseRef, { idField: 'id' });

  const {
    state: { expenseMoney, incomeMoney, prevMonthExpense, prevMonthIncome },
  } = useContext(AppContext);

  let salary = 0;
  let pocketMoney = 0;
  let food = 0;
  let bills = 0;
  let clothing = 0;
  let travel = 0;
  let others = 0;

  if (income) {
    for (let d of income) {
      if (d.category === 'Salary') {
        salary += Number(d.amount);
      }

      if (d.category === 'Pocket Money') {
        pocketMoney += Number(d.amount);
      }
    }
  }

  if (expense) {
    for (let e of expense) {
      switch (e.category) {
        case 'Food':
          food += Number(e.amount);
          break;

        case 'Bills':
          bills += Number(e.amount);
          break;

        case 'Clothing':
          clothing += Number(e.amount);
          break;

        case 'Travel':
          travel += Number(e.amount);
          break;

        case 'Others':
          others += Number(e.amount);
          break;

        default:
          break;
      }
    }
  }

  const incomeData = {
    labels: ['Salary', 'Pocket Money'],
    datasets: [
      {
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

  const expenseData = {
    labels: ['Food', 'Bills', 'Travel', 'Clothing', 'Others'],
    datasets: [
      {
        data: [food, bills, travel, clothing, others],
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

  const data = {
    labels: ['Previous Month', 'This Month'],
    datasets: [
      {
        label: 'Income',
        data: [prevMonthIncome, incomeMoney],
        backgroundColor: 'rgb(54, 162, 235)',
      },
      {
        label: 'Expense',
        data: [prevMonthExpense, expenseMoney],
        backgroundColor: 'rgb(75, 192, 192)',
      },
      {
        label: 'Remaining',
        data: [prevMonthIncome - prevMonthExpense, incomeMoney - expenseMoney],
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    title: {
      display: true,
      text: 'Previous Month Analysis',
      fontColor: 'white',
      fontFamily: 'Montserrat',
      fontSize: 16,
    },
  };

  return (
    <>
      <Box mt={12}>
        <Pie
          data={incomeData}
          width={500}
          options={{
            title: {
              display: true,
              text: 'Income Analysis',
              fontColor: 'white',
              fontFamily: 'Montserrat',
              fontSize: 16,
            },
          }}
        />
      </Box>
      <Box mt={12}>
        <Pie
          data={expenseData}
          width={500}
          options={{
            title: {
              display: true,
              text: 'Expense Analysis',
              fontColor: 'white',
              fontFamily: 'Montserrat',
              fontSize: 16,
            },
          }}
        />
      </Box>
      <Center>
        <Box width='600px' mt={12}>
          <Bar data={data} options={options} />
        </Box>
      </Center>
    </>
  );
};

export default PieChart;
