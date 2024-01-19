import AnimatedLoader from "react-native-animated-loader";


export default function Loader() {
    return (
        <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../image/loader.json")}
        animationStyle={{ width: 100, height: 100 }}
        speed={1}
        />
    );
    }