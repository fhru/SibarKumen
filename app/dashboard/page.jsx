'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  ChevronDown,
  CircleUser,
  Menu,
  Package2,
  Search,
  Bell,
  Home,
  ShoppingCart,
  Package,
  Users,
  LineChart,
  LayoutDashboard,
  Box,
  List,
  BarChart2,
  Tag,
  LogOut,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Chart from 'react-apexcharts';

const data = [
  { name: 'Jan', 'Barang Masuk': 650, 'Barang Keluar': 400 },
  { name: 'Feb', 'Barang Masuk': 680, 'Barang Keluar': 420 },
  { name: 'Mar', 'Barang Masuk': 700, 'Barang Keluar': 450 },
  { name: 'Apr', 'Barang Masuk': 720, 'Barang Keluar': 480 },
  { name: 'May', 'Barang Masuk': 750, 'Barang Keluar': 500 },
  { name: 'Jun', 'Barang Masuk': 780, 'Barang Keluar': 520 },
  { name: 'Jul', 'Barang Masuk': 800, 'Barang Keluar': 550 },
  { name: 'Aug', 'Barang Masuk': 820, 'Barang Keluar': 580 },
  { name: 'Sep', 'Barang Masuk': 850, 'Barang Keluar': 600 },
  { name: 'Oct', 'Barang Masuk': 880, 'Barang Keluar': 620 },
  { name: 'Nov', 'Barang Masuk': 900, 'Barang Keluar': 650 },
  { name: 'Dec', 'Barang Masuk': 920, 'Barang Keluar': 680 },
];

export default function DashboardPage() {
  const chartSeries = [
    {
      name: 'Barang Masuk',
      data: data.map((item) => item['Barang Masuk']),
    },
    {
      name: 'Barang Keluar',
      data: data.map((item) => item['Barang Keluar']),
    },
  ];

  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.map((item) => item.name),
      labels: {
        style: {
          colors: '#888888',
          fontSize: '12px',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#888888',
          fontSize: '12px',
        },
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    colors: ['#8884d8', '#82ca9d'],
    tooltip: {
      x: {
        format: 'MMM',
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Barang Terdaftar</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,782</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500">11.01%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Barang Masuk Bulan Ini</CardTitle>
            <ArrowDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,359</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
              <span className="text-red-500">9.05%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Barang Keluar Bulan Ini</CardTitle>
            <ArrowUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,359</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
              <span className="text-red-500">9.05%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Barang Hampir Habis</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,359</div>
            <p className="text-xs text-muted-foreground">Total barang dengan stok rendah</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Statistics</CardTitle>
          <Button variant="outline" className="flex items-center gap-2">
            05 Feb - 06 March <ChevronDown className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Barang Masuk dan Barang Keluar</p>
          <div className="h-[300px]">
            <Chart options={chartOptions} series={chartSeries} type="area" height="100%" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Barang Stok Rendah</CardTitle>
          <Button variant="link">See all</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Barang</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Satuan</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Kertas A4</TableCell>
                <TableCell>ATK</TableCell>
                <TableCell>2</TableCell>
                <TableCell>Rim</TableCell>
                <TableCell>
                  <Badge variant="destructive">Rendah</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Pel Lantai</TableCell>
                <TableCell>Kebersihan</TableCell>
                <TableCell>3</TableCell>
                <TableCell>Buah</TableCell>
                <TableCell>
                  <Badge variant="destructive">Rendah</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Pulpen Swallow</TableCell>
                <TableCell>ATK</TableCell>
                <TableCell>4</TableCell>
                <TableCell>Buah</TableCell>
                <TableCell>
                  <Badge variant="destructive">Rendah</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
