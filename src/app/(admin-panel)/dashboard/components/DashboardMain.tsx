'use client';

import { Basket, Books, HandArrowDown, UsersThree } from "@phosphor-icons/react/dist/ssr";
import PanelLayout from "../../layout/PanelLayout";
import Link from "next/link";
import { useState } from "react";
import { DatePicker, TimeRangePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { generateRandomData, groupAndSumData } from "@/utils/chart";

const rawSales: any = generateRandomData(30);
const rawEarnings: any = rawSales.map((item: any) => [
  item[0],
  item[1] * 0.5,
]);

const DashboardMain: React.FC = () => {
  const [filterDate, setFilterDate] = useState<{
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  }>({
    startDate: dayjs().subtract(30, 'day'),
    endDate: dayjs(),
  });

  const [areaSeries] = useState<ApexOptions["series"]>([
    {
      name: 'Sales',
      data: groupAndSumData(rawSales, 'day'),
    },
    {
      name: 'Earnings',
      data: groupAndSumData(rawEarnings, 'day'),
    }
  ]);
  const [areaChartOptions] = useState<ApexOptions>({
    chart: {
      height: 450,
      type: 'area',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Statistics',
      align: 'left',
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      }
    },
    xaxis: {
      type: 'datetime',
      min: filterDate.startDate?.valueOf(),
      max: filterDate.endDate?.valueOf(),
      title: {
        text: 'Date'
      }
    },
    yaxis: {
      title: {
        text: 'Total'
      },
      min: (num: number) => {
        if (num < 10 && num >= 0) {
          return 0;
        }
        return Math.floor(num / 10) * 10;
      },
      max: (num: number) => {
        if (num % 10 === 0) {
          return num + 10;
        }
        return Math.ceil(num / 10) * 10;
      },
    },
    tooltip: {
      y: {
        formatter: function (value: number, { seriesIndex }: { seriesIndex: number }) {
          if (seriesIndex === 1) {
            return `$${value}`;
          }
          return value.toString();
        },
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    },
  });

  const onRangeChange = (selectedDates: null | (Dayjs | null)[], _: string[]) => {
    const startDate = selectedDates?.[0] || null;
    const endDate = selectedDates?.[1] || null;
    setFilterDate({
      startDate,
      endDate,
    })
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Cannot select days after today
    return current > dayjs().endOf('day');
  };

  const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Today', value: [dayjs(), dayjs()] },
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] },
  ];

  return (
    <PanelLayout
      pageTitle="Dashboard"
    >
      <div className="w-full flex flex-col p-6 gap-6">
        {/* Summary */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">Summary</p>
            <DatePicker.RangePicker
              presets={rangePresets}
              onChange={onRangeChange}
              disabledDate={disabledDate}
              defaultValue={[filterDate.startDate, filterDate.endDate]}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="#">
              <div className="flex justify-between items-center bg-gradient-to-r from-flatprimary to-flatprimary-700 shadow-original text-white rounded-2xl p-4">
                <div className='flex flex-col gap-0'>
                  <p className='text-lg'>Total Products</p>
                  <p className='text-2xl font-bold'>10</p>
                </div>
                <div className='bg-white rounded-xl p-2'>
                  <Books size={32} weight='fill' color='black' />
                </div>
              </div>
            </Link>
            <Link href="#">
              <div className="flex justify-between items-center bg-gradient-to-r from-flatprimary to-flatprimary-700 shadow-original text-white rounded-2xl p-4">
                <div className='flex flex-col gap-0'>
                  <p className='text-lg'>Total Customers</p>
                  <p className='text-2xl font-bold'>10</p>
                </div>
                <div className='bg-white rounded-xl p-2'>
                  <UsersThree size={32} weight='fill' color='black' />
                </div>
              </div>
            </Link>
            <Link href="#">
              <div className="flex justify-between items-center bg-gradient-to-r from-flatprimary to-flatprimary-700 shadow-original text-white rounded-2xl p-4">
                <div className='flex flex-col gap-0'>
                  <p className='text-lg'>Total Sales</p>
                  <p className='text-2xl font-bold'>10</p>
                </div>
                <div className='bg-white rounded-xl p-2'>
                  <Basket size={32} weight='fill' color='black' />
                </div>
              </div>
            </Link>
            <Link href="#">
              <div className="flex justify-between items-center bg-gradient-to-r from-flatprimary to-flatprimary-700 shadow-original text-white rounded-2xl p-4">
                <div className='flex flex-col gap-0'>
                  <p className='text-lg'>Total Earnings</p>
                  <p className='text-2xl font-bold'>$52</p>
                </div>
                <div className='bg-white rounded-xl p-2'>
                  <HandArrowDown size={32} weight='fill' color='black' />
                </div>
              </div>
            </Link>
          </div>
        </div>
        {/* Statistics */}
        <div className="flex w-full p-4 rounded-2xl bg-white shadow-original">
          <div id="chart-income" className="w-full">
            <ReactApexChart options={areaChartOptions} series={areaSeries} type={areaChartOptions.chart?.type} height={areaChartOptions.chart?.height} />
          </div>
        </div>
      </div>
    </PanelLayout>
  )
}

export default DashboardMain;