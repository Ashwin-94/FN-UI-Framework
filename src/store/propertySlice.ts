// src/store/propertySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  propertyImage: "src/assets/img/property1.jpg",
  propertyName: "Olam Apartments",
  propertyType: "Commercial",
  propertyPrice: "RS.10000",
  rating: 4,
  propertyAddress: "No. 15, #rd Main Road, Anna Nagar, Chennai, Tamil Nadu. 600040, India",
  propertyDescription: "Spacious Bedroom in anna nagar with modern kitchen, balcony and amenities like swimming pool and gym.",
  leaseInfo: {
    startDate: "01/01/2023",
    endDate: "12/31/2023"
  },
  tenantInfo: [
    {
    phone: "9876532145",
    name: "Kumar",
    address: "Suite 2B, Plaza Towers, 9th Avenue, Ashok Nagar, Chennai"
  },
  
  {
    phone: "7598159224",
    name: "Ashwin",
    address: "1-2/34 sankari salem, TN"
  }
],
  activities: [
    { 
        status: 'Rent Request Sent', 
        date: '01/07/2024 09:00', 
        icon: 'pi pi-envelope', 
        color: '#2196F3', 
        image: 'request-sent.jpg', 
        description: 'The rent request was sent to the tenant.' 
    },
    { 
        status: 'Rent Received', 
        date: '03/07/2024 12:00', 
        icon: 'pi pi-dollar', 
        color: '#4CAF50', 
        description: 'The rent payment was received from the tenant.' 
    },
    { 
        status: 'Payment Reminder Sent', 
        date: '10/07/2024 08:00', 
        icon: 'pi pi-bell', 
        color: '#FFC107', 
        description: 'A reminder for the rent payment was sent to the tenant.' 
    }
]
};

const propertySlice = createSlice({
  name: "propertyDetails",
  initialState,
  reducers: {
    setDynamicContent(state, action: PayloadAction<typeof initialState>) {
      return { ...state, ...action.payload };
    }
  }
});

export const { setDynamicContent } = propertySlice.actions;
export default propertySlice.reducer;
