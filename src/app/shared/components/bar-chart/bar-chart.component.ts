import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { map, Subject, takeUntil } from 'rxjs';
import { PaymentsService } from 'shared/services/payments/payments.service';
import { ExpenseStateModel } from 'shared/models/expense-payment';
import { IncomeStateModel } from 'shared/models/income-payment';
import { addMonths, parseISO, subMonths } from 'date-fns';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit, OnDestroy {
  months: string[] = [];
  valuesExpense: number[] = [];
  valuesIncomes: number[] = [];
  averageIncomes: number = 0;
  averageExpense: number = 0;
  monthlyExpense: number = 0;
  monthlyIncome: number = 0;
  barChart: any;
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private paymentsService: PaymentsService) {}

  ngOnInit() {
    const now = new Date();
    const currentDate = now.toISOString();

    const previousYear = new Date();
    previousYear.setFullYear(now.getFullYear() - 1);
    const previousYearDate = previousYear.toISOString();
    this.paymentsService.getExpensesByDate(previousYearDate, currentDate);
    this.paymentsService.getIncomesByDate(previousYearDate, currentDate);
    this.paymentsService.allIncomes$
      .pipe(
        map(incomes => this.groupIncomesByLast12Months(incomes)),
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        this.updateChartData(data, 'incomes');
        this.averageIncomes = this.calculateAverageMonthly(this.valuesIncomes);
        this.monthlyIncome = this.calculateMonthlyPercentageChange(this.valuesIncomes);
      });
    this.paymentsService.allExpenses$
      .pipe(
        map(expenses => this.groupExpensesByLast12Months(expenses)),
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        this.updateChartData(data, 'expenses');
        this.averageExpense = this.calculateAverageMonthly(this.valuesExpense);
        this.monthlyExpense = this.calculateMonthlyPercentageChange(this.valuesExpense);
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  updateChartData(data: { month: string; total: number }[], type: string) {
    if (!this.barChart) this.renderChart();

    if (this.months.length === 0) {
      this.months = data.map(data => data.month);
      this.barChart.data.labels = this.months;
    }

    if (type === 'incomes') {
      this.valuesIncomes = data.map(income => income.total);
      this.barChart.data.datasets[1].data = this.valuesIncomes;
    } else if (type === 'expenses') {
      this.valuesExpense = data.map(expense => expense.total);
      this.barChart.data.datasets[0].data = this.valuesExpense.map(value => value * -1);
    }

    if (this.valuesIncomes.length === this.valuesExpense.length) this.barChart.update();
  }

  calculateMonthlyPercentageChange(data: number[]) {
    if (data.length < 2) {
      return 0;
    }

    const currentMonthTotal = data[data.length - 1];
    const previousMonthTotal = data[data.length - 2];
    const change = previousMonthTotal === 0 ? 0 : ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
    return Math.round(change * 10) / 10;
  }

  calculateAverageMonthly(data: number[]): number {
    if (data.length === 0) {
      return 0;
    }

    const totalExpense = data.reduce((sum, expense) => sum + expense, 0);
    const averageExpense = totalExpense / data.length;
    return Math.round(averageExpense * 10) / 10;
  }

  formatMonthKey(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Форматуємо місяць з двома цифрами
    return `${year}-${month}`;
  }

  groupExpensesByLast12Months(expenses: ExpenseStateModel[]): { month: string; total: number }[] {
    const today = new Date();

    const startMonth = subMonths(today, 11);

    const monthlyExpenses: { [key: string]: number } = {};

    for (let i = 0; i < 12; i++) {
      const date = addMonths(startMonth, i);
      const monthKey = this.formatMonthKey(date);
      monthlyExpenses[monthKey] = 0;
    }

    expenses.forEach(expense => {
      const expenseDate = parseISO(expense.expensesDate);
      if (expenseDate >= startMonth && expenseDate <= today) {
        const monthKey = this.formatMonthKey(expenseDate);
        if (Object.prototype.hasOwnProperty.call(monthlyExpenses, monthKey)) {
          monthlyExpenses[monthKey] += expense.cost;
        }
      }
    });

    return Object.keys(monthlyExpenses).map(month => ({
      month,
      total: monthlyExpenses[month]
    }));
  }

  groupIncomesByLast12Months(expenses: IncomeStateModel[]): { month: string; total: number }[] {
    const today = new Date();

    const startMonth = subMonths(today, 11);

    const monthlyExpenses: { [key: string]: number } = {};

    for (let i = 0; i < 12; i++) {
      const date = addMonths(startMonth, i);
      const monthKey = this.formatMonthKey(date);
      monthlyExpenses[monthKey] = 0;
    }

    expenses.forEach(expense => {
      const expenseDate = parseISO(expense.incomeDate);
      if (expenseDate >= startMonth && expenseDate <= today) {
        const monthKey = this.formatMonthKey(expenseDate);
        if (Object.prototype.hasOwnProperty.call(monthlyExpenses, monthKey)) {
          monthlyExpenses[monthKey] += expense.profit;
        }
      }
    });

    return Object.keys(monthlyExpenses).map(month => ({
      month,
      total: monthlyExpenses[month]
    }));
  }

  data = {
    labels: this.months,
    datasets: [
      {
        label: 'Витрати',
        data: this.valuesExpense,
        backgroundColor: 'rgba(234, 34, 61, 0.8)',
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
        borderRadius: 20,
        borderSkipped: false
      },
      {
        label: 'Прибутки',
        data: this.valuesIncomes,
        backgroundColor: 'rgba(44, 129, 242, 0.8)',
        borderWidth: 1,
        barPercentage: 1,
        categoryPercentage: 1,
        borderRadius: 20,
        borderSkipped: false
      }
    ]
  };

  renderChart() {
    if (this.barChart) this.barChart.destroy();
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: this.data,
      options: {
        scales: {
          x: {
            grid: {
              display: true
            }
          },
          y: {
            grid: {
              display: true
            }
          }
        },
        responsive: true,
        plugins: {
          datalabels: {
            display: false
          },
          legend: {
            display: false
          },
          title: {
            display: false
          }
        }
      }
    });
  }
}
