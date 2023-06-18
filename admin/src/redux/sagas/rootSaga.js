import { all } from "redux-saga/effects";
import * as UserSaga from "./UserSaga"
import * as CategoriesSaga from "./CategoriesSaga"
import * as ProductSaga from "./ProductSaga"
import * as SupplierSaga from "./SupplierSaga"
import * as BillSaga from "./BillSaga"
import * as StatusOrderSaga from "./StatusOrderSaga"
import * as CustomerSaga from "./CustomerSaga"
import * as NewsSaga from "./NewsSaga"
import * as StatisticSaga from "./StatisticSaga"
import * as OrderSaga from "./OrderSaga"
export function* rootSaga() {
  yield all([
    UserSaga.theoDoiSignin(),
    UserSaga.theoDoiGetAllUser(),
    UserSaga.theoDoiInsertUsers(),
    UserSaga.theoDoiUpdateUsers(),
    UserSaga.theoDoiDeleteUser(),

    //

    CustomerSaga.theoDoiGetAllCustomer(),
    CustomerSaga.theoDoiInsertCustomers(),
    CustomerSaga.theoDoiUpdateCustomers(),
    CustomerSaga.theodoiDeleteCustomer(),


    //
    CategoriesSaga.theoDoiGetAllCategories(),
    CategoriesSaga.theoDoiInsertCategories(),
    CategoriesSaga.theoDoiDeleteCategories(),
    CategoriesSaga.theoDoiUpdateCategories(),

    //product
    ProductSaga.theoDoiGetAllProduct(),
    ProductSaga.theoDoiInsertProduct(),
    ProductSaga.theoDoiDeleteProduct(),
    ProductSaga.theoDoiUpdateProduct(),
    //Supplier
    SupplierSaga.theoDoiDeleteSupplier(),
    SupplierSaga.theoDoiGetAllSupplier(),
    SupplierSaga.theoDoiInsertSupplier(),
    SupplierSaga.theoDoiUpdateSupplier(),
    //
    NewsSaga.theoDoiDeleteNews(),
    NewsSaga.theoDoiGetAllNews(),
    NewsSaga.theoDoiInsertNews(),
    NewsSaga.theoDoiUpdateNews(),

    //status
    StatusOrderSaga.theoDoiGetAllStatus(),




    //bill
    BillSaga.theoDoiAddBills(),
    BillSaga.theoDoiDeleteBill(),
    BillSaga.theoDoiGetAllBills(),
    BillSaga.theoDoiInsertNewProductBill(),
    BillSaga.theoDoiInsertProductBill(),
    BillSaga.theoDoiGetAllProductBills(),
    BillSaga.theoDoiDeleteProductBill(),
    BillSaga.theoDoiDeleteAllProductBill(),
    BillSaga.theoDoiGetAllDetailByIdBills(),
    BillSaga.theoDoiUpdateBills(),
    BillSaga.theoDoiDeleteDetailBill(),

    //Statistic
    StatisticSaga.theoDoiThongKeChiTieuTheoNam(),
    StatisticSaga.theoDoiThongKeChiTieuTheoThang(),
    StatisticSaga.theoDoiThongKeHDBCXLTheoThang(),
    StatisticSaga.theoDoiThongKeHDBDXLTheoNam(),
    StatisticSaga.theoDoiThongKeHDNDXLTheoNam(),
    StatisticSaga.theoDoiThongKeThuNhapTheoLoai(),
    StatisticSaga.theoDoiThongKeThuNhapTheoNam(),
    StatisticSaga.theoDoiThongKeThuNhapTheoThang(),
    StatisticSaga.theoDoiThongKeTop5Customer(),
    StatisticSaga.theoDoiThongKeTop5Product(),

    //order
    OrderSaga.theoDoiDeleteOrder(),
    OrderSaga.theoDoiGetAllOrder(),
    OrderSaga.theoDoiUpdateOrder(),







  ])
}