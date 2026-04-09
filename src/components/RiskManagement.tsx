import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShieldAlert, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const risks = [
  {
    category: 'An toàn cháy nổ',
    items: [
      { title: 'Lối thoát hiểm', desc: 'Đảm bảo thông thoáng, có biển chỉ dẫn sáng đèn.', priority: 'High' },
      { title: 'Thiết bị PCCC', desc: 'Bố trí bình chữa cháy tại FOH, Backstage và các khu vực kỹ thuật.', priority: 'High' },
      { title: 'Vật liệu dễ cháy', desc: 'Hạn chế dùng vải, giấy gần khu vực đèn công suất lớn.', priority: 'Medium' }
    ]
  },
  {
    category: 'An toàn điện',
    items: [
      { title: 'Dây dẫn', desc: 'Dùng dây 2 lớp vỏ, treo cao hoặc đi nẹp bán nguyệt.', priority: 'High' },
      { title: 'Tủ điện', desc: 'Sử dụng tủ công nghiệp có CP chống giật (ELCB).', priority: 'High' },
      { title: 'Grounding', desc: 'Kiểm tra tiếp địa cho toàn bộ hệ thống âm thanh, ánh sáng.', priority: 'Medium' }
    ]
  },
  {
    category: 'Kết cấu & Truss',
    items: [
      { title: 'Ballast', desc: 'Sử dụng thùng nước 1000L làm đối trọng cho truss ngoài trời.', priority: 'High' },
      { title: 'Neo cáp', desc: 'Kiểm tra các điểm neo, tăng đơ và khóa cáp đúng kỹ thuật.', priority: 'High' },
      { title: 'Tải trọng', desc: 'Không treo quá tải trọng an toàn (SWL) của truss.', priority: 'High' }
    ]
  }
];

export default function RiskManagement() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Risk Management Protocol</h1>
          <p className="text-slate-500">Quy trình kiểm soát rủi ro và đảm bảo an toàn vận hành onsite.</p>
        </div>
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 px-4 py-1 text-sm font-bold">
          Safety First
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {risks.map((group, i) => (
          <div key={i} className="space-y-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 px-2">
              <ShieldAlert className="w-5 h-5 text-orange-500" />
              {group.category}
            </h3>
            {group.items.map((risk, j) => (
              <Card key={j} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-bold">{risk.title}</CardTitle>
                    <Badge variant={risk.priority === 'High' ? 'destructive' : 'secondary'} className="text-[10px] h-5">
                      {risk.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-xs text-slate-600 leading-relaxed">{risk.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>

      <Card className="bg-slate-900 text-white border-none overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck className="w-32 h-32" />
        </div>
        <CardHeader>
          <CardTitle>Emergency Contact Procedure</CardTitle>
          <CardDescription className="text-slate-400">Quy trình xử lý khủng hoảng nhanh</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
            <p className="text-xs text-slate-400 uppercase font-bold mb-1">PCCC</p>
            <p className="text-2xl font-black text-orange-500">114</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Cấp cứu</p>
            <p className="text-2xl font-black text-orange-500">115</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700">
            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Security Lead</p>
            <p className="text-2xl font-black text-orange-500">Hotline Onsite</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
