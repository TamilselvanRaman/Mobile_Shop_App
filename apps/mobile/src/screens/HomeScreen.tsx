import { View, Text, ScrollView } from "react-native";
import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function HomeScreen() {
  return (
    <ScrollView>
      <StyledView className="flex-1 items-center justify-center bg-white p-4">
        <StyledText className="text-2xl font-bold mb-4">Welcome to Mobile Shop</StyledText>
        <StyledText className="text-gray-600">
          Find the best mobiles and accessories here.
        </StyledText>
      </StyledView>
    </ScrollView>
  );
}
