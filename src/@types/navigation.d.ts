export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            index: undefined,
            home: {
                total: number;
                credit: number | null;
            },
            transfer: undefined,
            savings: {
                newData: Object | null;
            },
            createGoal: undefined,
            paybillsmenu: {
                balance: number;
                invoice: number;
            },
            paybill: {
                balance: number;
                invoice: number;
            },
            paycreditcard: {
                balance: number;
                invoice: number;
            },
            withdraw: {
                balance: number;
                newAccount: Object | null;
            },
            addnewaccount: {
                balance: number;
                accounts: Array | null;
            },
        }
    }
}