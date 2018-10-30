import { StyleSheet, Platform } from 'react-native';

export const colors = {
    pale: '#ffebcb',
    buttonPressedOrange: '#f8c065',
    orange: '#f5a623',
    topaz: '#11cac0',
    buttonPressedTopaz: '#58dad3',
    blueGreen: '#0d9790',
    buttonPressedWhite: '#f4f4f4',
    lightGrey: '#eaeae3',
    darkerGrey: '#d0d0c5',
    greyishBrown: '#595959',
    black: '#313131',
    sunYellow: '#ffe22b',
    white: '#ffffff',
    darkGreyWithAlpha: 'rgba(0, 0, 0, 0.4)',
  };

export const values = {
    navigationIconSize: 28,
    largeIconSize: 30,
    mediumIconSize: 25,
    smallIconSize: 20,
    smallerIconSize: 18,
    roundedBorderRadius: 25,
    lessRoundedBorderRadius: 10,
    contentPadding: 10,
};

export const textStyles = StyleSheet.create({
    headlineH1StyleBlackLeft: {
        fontFamily: 'Avenir',
        fontSize: 24,
        fontWeight: '900',
        fontStyle: 'normal',
        lineHeight: 36,
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.black,
    },
    headlineH2StyleWhiteLeft: {
        fontFamily: 'Avenir',
        fontSize: 18,
        fontWeight: '900',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.white,
    },
    headlineH2StyleBlackLeft: {
        fontFamily: 'Avenir',
        fontSize: 18,
        fontWeight: '900',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.black,
    },
    headlineH3StyleBlackLeft: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: '900',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.black,
    },
    headlineH4StyleBlackLeft: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.black,
    },
    paragraphBoldBlackLeft: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: '900',
        fontStyle: 'normal',
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.greyishBrown,
    },
    paragraphBoldWhiteLeft: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: '900',
        fontStyle: 'normal',
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.white,
    },
    paragraphStyleWhiteleft: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.white,
    },
    paragraphStyle: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.greyishBrown,
    },
    paragraphSmallStyleCenter: {
        fontFamily: 'Avenir',
        fontSize: 12,
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.greyishBrown,
    },
    paragraphSmallStyleLeft: {
        fontFamily: 'Avenir',
        fontSize: 12,
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.greyishBrown,
    },
    paragraphURL: {
        fontFamily: 'Avenir',
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 21,
        letterSpacing: 0,
        textDecorationLine: 'underline',
        textAlign: 'left',
        color: colors.greyishBrown,
    },
    paragraphStyleWhiteCenter: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'normal',
        lineHeight: 21,
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.white,
    },
    headlineH5StyleBlackLeft: {
        fontFamily: 'Avenir',
        fontSize: 11,
        fontWeight: '900',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.black,
    },
    headlineH5StyleBlackCenter: {
        fontFamily: 'Avenir',
        fontSize: 11,
        fontWeight: '900',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'center',
        color: colors.black,
    },
    button: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: '900',
        fontStyle: 'normal',
        lineHeight: 20,
        letterSpacing: 0.2,
        textAlign: 'center',
        color: colors.white,
    },
    whiteButton: {
        fontFamily: 'Avenir',
        fontSize: 16,
        fontWeight: '900',
        fontStyle: 'normal',
        lineHeight: 20,
        letterSpacing: 0.2,
        textAlign: 'center',
        color: colors.black,
    },
});

export const applicationStyles = StyleSheet.create({
    hr: {
        borderTopWidth: 0.5,
        borderColor: colors.lightGrey,
        flexDirection: 'row',
        flex: 1,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: -10,
        marginRight: -10,
    },
    orangeButton: {
        backgroundColor: colors.orange,
        borderRadius: values.roundedBorderRadius,
    },
    whiteButton: {
        backgroundColor: colors.white,
        borderRadius: values.roundedBorderRadius,
    },
    boxShadowBelow: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 1,
    },
    boxShadowAbove: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 1,
    },
    body: {
        backgroundColor: colors.lightGrey,
    },
});

// See https://github.com/mientjan/react-native-markdown-renderer/blob/master/src/lib/styles.js for styles to override.
export const markdownStyles = StyleSheet.create({
    text: {
        textAlign: 'left',
    },
    listUnorderedItemIcon: {
        fontWeight: 'bold',
        fontSize: 35,
        marginLeft: 10,
        marginRight: 10,
        ...Platform.select({
            ios: {
                lineHeight: 36,
            },
            android: {
                lineHeight: 40,
            },
        }),
    },
});
