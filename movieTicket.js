//Actions Creators

const newTicketBooking = (name, amount) => {
    return {
        type: "NEW_BOOKING",
        payload: {
            name,
            amount,
        },
    };
};
const cancelTicketBooking = (name, refundAmount) => {
    return {
        type: "CANCEL_BOOKING",
        payload: {
            name,
            refundAmount,
        },
    };
};

//Reducers

const ticketBookingList = (oldTicketBookingList = [], action) => {
    if (action.type === "NEW_BOOKING") {
        return [...oldTicketBookingList, action.payload];
    } else if (action.type === "CANCEL_BOOKING") {
        return oldTicketBookingList.filter((data) => {
            return data.name !== action.payload.name;
        });
    }
    return oldTicketBookingList;
};

const cancelledBookingList = (oldCancelBookingList = [], action) => {
    if (action.type === "CANCEL_BOOKING") {
        return [...oldCancelBookingList, action.payload];
    }
    return oldCancelBookingList;
};

const Accounts = (totalAmount = 1000, action) => {
    if (action.type === "NEW_BOOKING") {
        return totalAmount + action.payload.amount;
    } else if (action.type === "CANCEL_BOOKING") {
        return totalAmount - action.payload.refundAmount;
    }
    return totalAmount;
};

//creating central store

console.log(Redux);
const { createStore, combineReducers } = Redux;
const centralTicketData = combineReducers({
    Accounts: Accounts,
    ticketBookingList: ticketBookingList,
    cancelledBookingList: cancelledBookingList,
});

//store

const store = createStore(
    centralTicketData,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.dispatch(newTicketBooking("shubham", 120));
store.dispatch(newTicketBooking("pawar", 120));
store.dispatch(newTicketBooking("vaka", 120));
store.dispatch(cancelTicketBooking("vaka", 120));
store.dispatch(newTicketBooking("john", 120));
console.log(store.getState());