import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

const HomeTab = ({ strokeColor }) => (
    <Svg width={28} height={28} fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clipPath="url(#a)">
            <Path
                d="m26.35 12.258-.002-.002L15.742 1.65a2.377 2.377 0 0 0-1.693-.7c-.639 0-1.24.248-1.692.7l-10.6 10.6-.011.012a2.396 2.396 0 0 0 .004 3.38 2.38 2.38 0 0 0 1.662.701h.423v7.805a2.805 2.805 0 0 0 2.801 2.801h4.15c.42 0 .761-.34.761-.761v-6.12a1.28 1.28 0 0 1 1.279-1.278h2.447a1.28 1.28 0 0 1 1.278 1.278v6.12c0 .42.341.761.762.761h4.15a2.805 2.805 0 0 0 2.8-2.801v-7.805h.393c.639 0 1.24-.249 1.693-.701.932-.933.932-2.45 0-3.384Zm-1.079 2.307a.865.865 0 0 1-.615.255h-1.154a.762.762 0 0 0-.761.761v8.567a1.28 1.28 0 0 1-1.279 1.278h-3.387v-5.358a2.805 2.805 0 0 0-2.802-2.801h-2.447a2.805 2.805 0 0 0-2.802 2.801v5.358H6.636a1.28 1.28 0 0 1-1.278-1.278v-8.567a.762.762 0 0 0-.761-.761H3.463a.864.864 0 0 1-.635-.255.871.871 0 0 1 0-1.231v-.001L13.435 2.728a.863.863 0 0 1 .616-.255c.232 0 .45.09.615.255L25.268 13.33l.005.005c.337.34.337.891-.002 1.23Z"
                fill={strokeColor}
            />
        </G>
        <Defs>
            <ClipPath id="a">
                <Path
                    fill="#fff"
                    transform="translate(1 1)"
                    d="M0 0h26v26H0z"
                />
            </ClipPath>
        </Defs>
    </Svg>
);

export default HomeTab;
