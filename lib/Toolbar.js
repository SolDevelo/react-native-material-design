import React, {Component, PropTypes} from "react";
import {View, Text, Image, Platform} from "react-native";
import { TYPO, PRIMARY, THEME_NAME, PRIMARY_COLORS } from './config';
import { getColor } from './helpers';
import Icon from './Icon';
import IconToggle from './IconToggle';

export default class Toolbar extends Component {

    static propTypes = {
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        theme: PropTypes.oneOf(THEME_NAME),
        primary: PropTypes.oneOf(PRIMARY_COLORS),
        style: View.propTypes.style,
        leftIconStyle: PropTypes.object,
        rightIconStyle: PropTypes.object,
        logoStyle: PropTypes.object,
        elevation: PropTypes.number,
        overrides: PropTypes.shape({
            backgroundColor: PropTypes.string,
            titleColor: PropTypes.string,
            leftIconColor: PropTypes.string,
            rightIconColor: PropTypes.string
        }),
        icon: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        onIconPress: PropTypes.func,
        actions: PropTypes.arrayOf(PropTypes.shape({
            icon: PropTypes.string.isRequired,
            onPress: PropTypes.func,
            counter: PropTypes.shape()
        })),
        direction: PropTypes.oneOf(['ltr', 'rtl'])
    };

    static defaultProps = {
        theme: 'dark',
        primary: PRIMARY,
        elevation: 4,
        direction: 'ltr'
    };

    render() {
        const { title, theme, primary, style, leftIconStyle, rightIconStyle, logoStyle, elevation, overrides, icon, onIconPress, actions } = this.props;

        const themeMap = {
            light: {
                backgroundColor: '#ffffff',
                color: 'rgba(0,0,0,.87)',
                leftIconColor: 'rgba(0,0,0,.54)',
                rightIconColor: 'rgba(0,0,0,.54)'
            },
            dark: {
                backgroundColor: getColor(primary),
                color: 'rgba(255,255,255,.87)',
                leftIconColor: 'rgba(255,255,255,.87)',
                rightIconColor: 'rgba(255,255,255,.87)'
            }
        };

        const opacityMap = {
            light: .38,
            dark: .30
        };

        const styleMap = {
            backgroundColor: overrides && overrides.backgroundColor ? getColor(overrides.backgroundColor) : themeMap[theme].backgroundColor,
            color: overrides && overrides.color ? getColor(overrides.color) : themeMap[theme].color,
            leftIconColor: overrides && overrides.leftIconColor ? getColor(overrides.leftIconColor) : themeMap[theme].leftIconColor,
            rightIconColor: overrides && overrides.rightIconColor ? getColor(overrides.rightIconColor) : themeMap[theme].rightIconColor
        };
        if (this.props.direction=='ltr')
            return (
                <View style={[styles.toolbar, { backgroundColor :styleMap.backgroundColor, elevation }, style]}>
                    {
                        icon && (isNaN(icon)) ? (
                            <IconToggle
                                color={styleMap.leftIconColor}
                                onPress={onIconPress}
                            >
                                <Icon
                                    name={icon || 'menu'}
                                    size={24}
                                    color={styleMap.leftIconColor}
                                    style={[styles.leftIcon, leftIconStyle]}
                                />
                            </IconToggle>
                        ) : (
                            <View style={{width: 56}} />
                        )
                    }
                    {
                        (title && isNaN(title)) ? (
                            <Text
                                numberOfLines={1}
                                style={[styles.title, TYPO.paperFontTitle, {
                                color: styleMap.color,
                                marginLeft: icon ? styles.title.marginLeft : 16,
                                lineHeight: (Platform.OS === 'ios') ? 24 : null
                            }]}
                            >
                                {title}
                            </Text>
                        ) : (
                            <View
                                style={[styles.title, {
                                marginLeft: icon ? styles.title.marginLeft : 16
                            }]}
                            >
                                <Image
                                    source={title}
                                    style={logoStyle}
                                />
                            </View>
                        )
                    }
                    {
                        actions &&
                        actions.map(function (action, i) {
                            return (
                                <IconToggle
                                    key={i}
                                    color={styleMap.rightIconColor}
                                    badge={action.badge}
                                    onPress={action.onPress}
                                    disabled={action.disabled}
                                >
                                    <Icon name={action.icon}
                                          size={24}
                                          color={styleMap.rightIconColor}
                                          style={[styles.rightIcon, rightIconStyle, action.disabled ? { opacity: opacityMap[theme] } : null]}
                                    />
                                </IconToggle>
                            );
                        })
                    }
                </View>
            );
        return (
            <View style={[styles.toolbar, { backgroundColor :styleMap.backgroundColor, elevation }, style]}>
                {
                    actions &&
                    actions.map(function (action, i) {
                        return (
                            <IconToggle
                                key={i}
                                color={styleMap.rightIconColor}
                                badge={action.badge}
                                onPress={action.onPress}
                                disabled={action.disabled}
                            >
                                <Icon name={action.icon}
                                      size={24}
                                      color={styleMap.rightIconColor}
                                      style={[styles.rightIcon, rightIconStyle, action.disabled ? { opacity: opacityMap[theme] } : null]}
                                />
                            </IconToggle>
                        );
                    })
                }
                {
                    (title && isNaN(title)) ? (
                        <Text
                            numberOfLines={1}
                            style={[styles.title, TYPO.paperFontTitle, {
                                color: styleMap.color,
                                marginLeft: icon ? styles.title.marginLeft : 16,
                                lineHeight: (Platform.OS === 'ios') ? 24 : null,
                                textAlign: 'right'
                            }]}
                        >
                            {title}
                        </Text>
                    ) : (
                        <View
                            style={styles.title}
                        >
                            <Image
                                source={title}
                                style={[logoStyle, {alignSelf: 'flex-end'}]}
                            />
                        </View>
                    )
                }
                {
                    icon && (isNaN(icon)) ? (
                        <IconToggle
                            color={styleMap.leftIconColor}
                            onPress={onIconPress}
                        >
                            <Icon
                                name={icon || 'menu'}
                                size={24}
                                color={styleMap.leftIconColor}
                                style={[styles.leftIcon, leftIconStyle]}
                            />
                        </IconToggle>
                    ) : (
                        <View style={{width: 56}} />
                    )
                }
            </View>
        );
    }
}

const styles = {
    toolbar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        flex: 1,
        marginLeft: 16
    },
    leftIcon: {
        margin: 16
    },
    rightIcon: {
        margin: 16
    }
};
