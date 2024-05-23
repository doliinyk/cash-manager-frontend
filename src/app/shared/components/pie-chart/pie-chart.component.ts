import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {combineLatest, map, Observable, Subject, takeUntil} from 'rxjs';
import { CategoryStateModel } from 'shared/models/category';
import { CategoriesService } from 'shared/services/categories/categories.service';
import {PaymentsService} from "shared/services/payments/payments.service";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnDestroy {
  categories: CategoryStateModel[] = [];
  titles: string[] = [];
  colors: string[] = [];
  values: number[] = [];
  expensesWithCategory: { category: CategoryStateModel, sum: number }[] = [];
  totalSum: number = 0;
  pieChart: any;
  private readonly destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private categoriesService: CategoriesService, private paymentsService: PaymentsService) {}

  ngOnInit(): void {
    this.getExpensesByCategory().pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.expensesWithCategory = data;
      this.updateChartData(this.expensesWithCategory);
      this.totalSum = this.getTotalSum(this.expensesWithCategory);
    })
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  getTotalSum(expenses: { category: CategoryStateModel, sum: number}[]): number {
    return expenses.reduce((total, item) => total + item.sum, 0);
  }

  getExpensesByCategory(): Observable<{ category: CategoryStateModel, sum: number }[]> {
    return combineLatest([
      this.paymentsService.allExpenses$,
      this.categoriesService.expenseCategories$
    ]).pipe(
      map(([expenses, categories]) => {
        return categories.map(category => {
          const totalSum = expenses
            .filter(expense => expense.category?.title === category.title)
            .reduce((sum, expense) => sum + (expense.cost), 0);
          return { category, sum: totalSum };
        });
      })
    );
  }

  updateChartData(expenses: { category: CategoryStateModel, sum: number }[]) {
    this.titles = expenses.filter(data => data.sum !== 0).map(data => data.category.title);
    this.colors = expenses.filter(data => data.sum !== 0).map(data => data.category.colorCode);
    this.values = expenses.filter(data => data.sum !== 0).map(data => data.sum);
    this.renderChart();
  }

  renderChart() {
    if (this.pieChart) this.pieChart.destroy();
    this.pieChart = new Chart('pieChart', {
      type: 'doughnut',
      data: {
        labels: this.titles,
        datasets: [
          {
            data: this.values,
            backgroundColor: this.colors
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          datalabels: {
            formatter: (value: number, ctx: any): string => {
              let sum = 0;
              const dataArr: number[] = ctx.chart.data.datasets[0].data;
              dataArr.map((data: number) => {
                sum += data;
              });
              return ((value * 100) / sum).toFixed(2) + '%';
            },
            color: '#fff'
          },
          legend: {
            display: false
          }
        }
      }
    });
  }
}
