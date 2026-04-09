import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Zap, Calculator, ClipboardList, Users } from 'lucide-react';

export default function QuickTools() {
  const [power, setPower] = useState<string>('');
  const [voltage, setVoltage] = useState<string>('220');
  const [pf, setPf] = useState<string>('0.9');
  const [current, setCurrent] = useState<number | null>(null);

  const calculateCurrent = () => {
    const p = parseFloat(power);
    const u = parseFloat(voltage);
    const cosphi = parseFloat(pf);
    if (p && u && cosphi) {
      setCurrent(p / (u * cosphi));
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Power Calculator */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="w-5 h-5 text-orange-500" />
              <CardTitle>Power Calculator (1-Phase)</CardTitle>
            </div>
            <CardDescription>Tính dòng điện (A) dựa trên công suất (W)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Công suất (W)</Label>
                <Input 
                  type="number" 
                  placeholder="e.g. 3000" 
                  value={power} 
                  onChange={(e) => setPower(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Điện áp (V)</Label>
                <Input 
                  type="number" 
                  value={voltage} 
                  onChange={(e) => setVoltage(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Hệ số công suất (PF)</Label>
              <Input 
                type="number" 
                step="0.1" 
                value={pf} 
                onChange={(e) => setPf(e.target.value)}
              />
            </div>
            <Button onClick={calculateCurrent} className="w-full bg-slate-900 hover:bg-slate-800 text-white">
              Calculate Amperes
            </Button>
            {current !== null && (
              <div className="mt-4 p-4 bg-orange-50 rounded-2xl border border-orange-100 text-center">
                <p className="text-xs text-orange-600 uppercase font-bold tracking-wider mb-1">Result</p>
                <p className="text-4xl font-black text-orange-700">{current.toFixed(2)}A</p>
                <p className="text-[10px] text-orange-500 mt-2 italic">Khuyến nghị: Sử dụng dây tiết diện tối thiểu 2.5mm²</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Checklists */}
        <Card className="border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <ClipboardList className="w-5 h-5 text-orange-500" />
              <CardTitle>Onsite Checklists</CardTitle>
            </div>
            <CardDescription>Các đầu việc quan trọng không được bỏ lỡ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              'Kiểm tra ballast thùng nước cho truss ngoài trời',
              'Check list thiết bị âm thanh/ánh sáng theo rider',
              'Kiểm tra lối thoát hiểm và bình chữa cháy',
              'Test máy phát điện và nguồn điện dự phòng',
              'Briefing an toàn cho đội ngũ thi công',
              'Kiểm tra độ phẳng và chịu lực của sàn sân khấu'
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700">
                <div className="w-5 h-5 rounded border border-slate-300 bg-white shrink-0" />
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Personnel Allocation Template */}
      <Card className="border-slate-200">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-orange-500" />
            <CardTitle>Personnel Allocation (Standard)</CardTitle>
          </div>
          <CardDescription>Phân bổ nhân sự vận hành cho sự kiện quy mô vừa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
                  <th className="text-left py-3 font-medium">Vị trí</th>
                  <th className="text-left py-3 font-medium">Số lượng</th>
                  <th className="text-left py-3 font-medium">Trách nhiệm chính</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { pos: 'Operation Lead', qty: '01', task: 'Điều phối tổng thể, xử lý sự cố' },
                  { pos: 'Technical Supervisor', qty: '01', task: 'Giám sát ATAS, điện, kết cấu' },
                  { pos: 'Onsite Coordinator', qty: '02', task: 'Quản lý supplier, logistic' },
                  { pos: 'Safety Officer', qty: '01', task: 'Kiểm soát rủi ro, PCCC' },
                  { pos: 'Crew / Support', qty: '04-06', task: 'Hỗ trợ hiện trường, setup' }
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="py-4 font-semibold text-slate-800">{row.pos}</td>
                    <td className="py-4 text-slate-600">{row.qty}</td>
                    <td className="py-4 text-slate-600">{row.task}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
