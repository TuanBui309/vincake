import { baseService } from "./baseService";


export class StatisticService extends baseService {

    constructor(){
        super();
    }
    

    ThongKeChiTieuTheoNam = (Year) => {
        
       return this.get(`Statistic/thongkechitieuTheoNam?year=${Year}`);
    }
    ThongKeHDNDXLTheoNam = (Year) => {
        
        return this.get(`Statistic/thongkehoadonnhapdangxuly?year=${Year}`);
     }
    ThongKeThuNhapTheoNam = (Year) => {
        
        return this.get(`Statistic/thongkethunhap?year=${Year}`);
     }
     ThongKeHDBDXLTheoNam = (Year) => {
        
        return this.get(`Statistic/thongkehoadonBandangxuly?year=${Year}`);
     }
     //theo thang
     ThongKeChiTieuTheoThang = () => {
        
        return this.get(`Statistic/thongkechitieuTheoThang`);
     }
     ThongKeThuNhapTheoThang = () => {
        
        return this.get(`Statistic/thongkethunhapTheoThang`);
     }
     ThongKeHDBDXLTheoThang = () => {
        
        return this.get(`Statistic/thonghoadonbanDangXuLy`);
     }




     //theo loai
    ThongKeThuNhapTheoLoai=(date)=>{
        return this.get(`Statistic/thongKeThuNhapTheoLoais?tuNgay=${date.tuNgay}&denNgay=${date.denNgay}`)



    }
    //top 5
    Top5ProductBC=(dates)=>{
        return this.get(`Statistic/top5ProductBC?tuNgay=${dates.tuNgay}&denNgay=${dates.denNgay}`)
    }
    Top5Customer=(datetime)=>{
        return this.get(`Statistic/top5CustomerMaxTotal?tuNgay=${datetime.tuNgay}&denNgay=${datetime.denNgay}`)
    }
    
    
}


export const statisticService = new StatisticService();
