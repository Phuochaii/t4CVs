import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PdfDocument {
  // ... (Thêm các thuộc tính cần thiết cho tài liệu PDF)
}

interface PdfState {
  document: any | null;
  filename: string;
}

const initialState: PdfState = {
  document: null,
  filename: "",
};

const pdfSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    setPdf: (
      state,
      action: PayloadAction<{ document: PdfDocument; filename: string }>
    ) => {
      state.document = action.payload.document;
      state.filename = action.payload.filename;
    },
    resetPdf: (state) => {
      state.document = null;
      state.filename = "";
    },
  },
});

export const { setPdf, resetPdf } = pdfSlice.actions;

export default pdfSlice.reducer;
