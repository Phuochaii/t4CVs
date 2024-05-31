import { ResumeCustom } from "../../../../../utils/redux/types";
import { ResumePDFBulletList, ResumePDFSection } from "./common";
import { View } from "@react-pdf/renderer";
import { styles } from "./styles";

export const ResumePDFCustom = ({
  heading,
  custom,
  themeColor,
  showBulletPoints,
}: {
  heading: string;
  custom: ResumeCustom;
  themeColor: string;
  showBulletPoints: boolean;
}) => {
  const { descriptions } = custom;

  return (
    <ResumePDFSection themeColor={themeColor} heading={heading}>
      <View style={{ ...styles.flexCol }}>
        <ResumePDFBulletList
          items={descriptions}
          showBulletPoints={showBulletPoints}
        />
      </View>
    </ResumePDFSection>
  );
};
