import { GeneralSetting } from "../../../../../utils/redux/settingsSlice";
import {
  FONT_FAMILY_TO_DISPLAY_NAME,
  FONT_FAMILY_TO_STANDARD_SIZE_IN_PT,
  getAllFontFamiliesToLoad,
} from "../../fonts/constants";
import { PX_PER_PT } from "../../../../../utils/constants";
import React, { Suspense, lazy } from "react";

const FontFamilySelections = lazy(
  () => import("./FontFamilySelectionsComponent")
);

const SelectionComponent = ({
  selectedColor,
  isSelected,
  style = {},
  onClick,
  children,
}: {
  selectedColor: string;
  isSelected: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const selectedStyle = {
    color: "white",
    backgroundColor: selectedColor,
    borderColor: selectedColor,
    ...style,
  };

  return (
    <div
      className="flex w-[105px] cursor-pointer items-center justify-center rounded-md border border-gray-300 py-1.5 shadow-sm hover:border-gray-400 hover:bg-gray-100"
      onClick={onClick}
      style={isSelected ? selectedStyle : style}
      onKeyDown={(e) => {
        if (["Enter", " "].includes(e.key)) onClick();
      }}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

const SelectionsWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-2 flex flex-wrap gap-3 text-black">{children}</div>;
};

export const FontFamilySelectionCSR = ({
  selectedFontFamily,
  themeColor,
  handleSettingsChange,
}: {
  selectedFontFamily: string;
  themeColor: string;
  handleSettingsChange: (field: GeneralSetting, value: string) => void;
}) => (
  <Suspense fallback={<div>Loading...</div>}>
    <FontFamilySelections
      selectedFontFamily={selectedFontFamily}
      themeColor={themeColor}
      handleSettingsChange={handleSettingsChange}
    />
  </Suspense>
);

export const FontSizeSelections = ({
  fontFamily,
  themeColor,
  selectedFontSize,
  handleSettingsChange,
}: {
  fontFamily: string;
  themeColor: string;
  selectedFontSize: string;
  handleSettingsChange: (field: GeneralSetting, value: string) => void;
}) => {
  const standardSizePt = FONT_FAMILY_TO_STANDARD_SIZE_IN_PT[fontFamily];
  const compactSizePt = standardSizePt - 1;

  return (
    <SelectionsWrapper>
      {["Compact", "Standard", "Large"].map((type, idx) => {
        const fontSizePt = String(compactSizePt + idx);
        const isSelected = fontSizePt === selectedFontSize;

        return (
          <SelectionComponent
            key={idx}
            selectedColor={themeColor}
            isSelected={isSelected}
            style={{
              fontFamily,
              fontSize: `${Number(fontSizePt) * PX_PER_PT}px`,
            }}
            onClick={() => handleSettingsChange("fontSize", fontSizePt)}
          >
            {type}
          </SelectionComponent>
        );
      })}
    </SelectionsWrapper>
  );
};

export const DocumentSizeSelections = ({
  themeColor,
  selectedDocumentSize,
  handleSettingsChange,
}: {
  themeColor: string;
  selectedDocumentSize: string;
  handleSettingsChange: (field: GeneralSetting, value: string) => void;
}) => {
  return (
    <SelectionsWrapper>
      {["Letter", "A4"].map((type, idx) => {
        return (
          <SelectionComponent
            key={idx}
            selectedColor={themeColor}
            isSelected={type === selectedDocumentSize}
            onClick={() => handleSettingsChange("documentSize", type)}
          >
            <div className="flex flex-col items-center">
              <div>{type}</div>
              <div className="text-xs text-center">
                {type === "Letter" ? "(US, Canada)" : "(India,Other Countries)"}
              </div>
            </div>
          </SelectionComponent>
        );
      })}
    </SelectionsWrapper>
  );
};
