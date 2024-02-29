import { create } from "zustand";

interface FilesState {
  files: File[];
  onChange: (value: File[]) => void;
}

const useFiles = create<FilesState>((set) => ({
  files: [],
  onChange: (files) => set({ files }),
}));

export default useFiles;
