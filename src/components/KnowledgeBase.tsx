import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Box, 
  Speaker, 
  Lightbulb, 
  Layers, 
  Monitor, 
  Zap, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

const knowledgeData = {
  materials: [
    { name: 'Plywood (Gỗ dán)', use: 'Làm khung xương, backdrop, sàn sân khấu', note: 'Chịu ẩm kém, cần lớp sơn lót nếu dùng sơn dầu' },
    { name: 'MDF', use: 'Bề mặt vách, bàn, kệ', note: 'Bề mặt phẳng đẹp, kỵ nước (không dùng ngoài trời)' },
    { name: 'Foamex', use: 'Vách ngoài trời, mô hình 3D', note: 'Kháng nước, nhẹ, dễ biến dạng nếu va chạm mạnh' },
    { name: 'Aluminium', use: 'Bảng hiệu mặt tiền, booth cao cấp', note: 'Chống cháy tốt, độ bền cao, chi phí cao' },
    { name: 'Polycarbonate', use: 'Mái che, tấm lợp lấy sáng', note: 'Cứng hơn kính 6 lần, thay thế mica trong quảng cáo' },
  ],
  audio: [
    { name: 'Line Array VIO L210', use: 'Hội nghị lớn, Gala dinner, Outdoor trung bình', spec: '900W RMS, SPL 135dB' },
    { name: 'Sub VIO S318', use: 'Concert, DJ, Outdoor cần low-end mạnh', spec: '2700W RMS, SPL 143dB' },
    { name: 'Monitor FMX12', use: 'MC, Speech, Vocal nhẹ', spec: '600W RMS, wedge 12 inch' },
  ],
  lighting: [
    { name: 'Beam 450/580', use: 'Tạo tia beam, aerial effect', note: 'Cần treo cao, tránh chiếu trực tiếp vào camera' },
    { name: 'Profile 1000W LED', use: 'Key light hiệu ứng, profile cắt khung', note: 'Dùng cho event cao cấp, cần độ chính xác cao' },
    { name: 'Wash LED 19x20W', use: 'Phủ màu sân khấu, nhuộm màu backdrop', note: 'Góc chiếu rộng, đổi màu linh hoạt' },
  ],
  truss: [
    { name: 'Layer Truss Ringlock', use: 'Khung chịu lực quy mô lớn, tháp treo loa', note: 'Chịu lực cực tốt, thi công chậm hơn nhôm' },
    { name: 'Aluminum Truss', use: 'Indoor/Outdoor, touring, cổng chào', note: 'Nhẹ, linh hoạt, thẩm mỹ cao' },
    { name: 'Ballast (Thùng nước)', use: 'Đối trọng cho kết cấu ngoài trời', note: 'Thùng 1000L (~1 tấn), cần neo cáp đúng kỹ thuật' },
  ]
};

export default function KnowledgeBase() {
  return (
    <div className="p-8 max-w-6xl mx-auto h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Operational Knowledge Base</h1>
        <p className="text-slate-500">Thư viện kiến thức chuẩn cho Operation Director dựa trên 20 năm kinh nghiệm thực chiến.</p>
      </div>

      <Tabs defaultValue="materials" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="bg-slate-100 p-1 rounded-2xl w-fit mb-6">
          <TabsTrigger value="materials" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Box className="w-4 h-4 mr-2" /> Materials
          </TabsTrigger>
          <TabsTrigger value="audio" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Speaker className="w-4 h-4 mr-2" /> Audio
          </TabsTrigger>
          <TabsTrigger value="lighting" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Lightbulb className="w-4 h-4 mr-2" /> Lighting
          </TabsTrigger>
          <TabsTrigger value="truss" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Layers className="w-4 h-4 mr-2" /> Structure
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1 pr-4">
          <TabsContent value="materials" className="m-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {knowledgeData.materials.map((item, idx) => (
                <Card key={idx} className="border-slate-200 hover:border-orange-200 transition-colors group">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">{item.name}</CardTitle>
                      <Badge variant="secondary">Material</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-slate-600"><span className="font-semibold">Ứng dụng:</span> {item.use}</p>
                    <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-slate-500">{item.note}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audio" className="m-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {knowledgeData.audio.map((item, idx) => (
                <Card key={idx} className="border-slate-200">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Audio</Badge>
                    </div>
                    <CardDescription>{item.spec}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>{item.use}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lighting" className="m-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {knowledgeData.lighting.map((item, idx) => (
                <Card key={idx} className="border-slate-200">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Lighting</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-slate-600">{item.use}</p>
                    <p className="text-xs text-slate-400 italic font-mono">{item.note}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="truss" className="m-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {knowledgeData.truss.map((item, idx) => (
                <Card key={idx} className="border-slate-200">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">Structure</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-slate-600">{item.use}</p>
                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 border border-slate-100">
                      {item.note}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}
