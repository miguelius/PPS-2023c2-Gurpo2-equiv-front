export default ({ palette, spacing }) => {
    const radius = spacing(2.5);
    const rightBgColor = palette.primary.main;

    // if you want the same as facebook messenger, use this color '#09f'
    return {
        msg: {
            padding: spacing(1, 2),
            borderRadius: 4,
            marginBottom: 4,
            display: 'inline-block',
            wordBreak: 'break-word',
            fontFamily:
                // eslint-disable-next-line max-len
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            fontSize: '16px'
        },
        left: {
            borderTopRightRadius: radius,
            borderBottomRightRadius: radius,
            backgroundColor: palette.grey[200]
        },
        right: {
            borderTopLeftRadius: radius,
            borderBottomLeftRadius: radius,
            backgroundColor: rightBgColor,
            color: palette.common.white
        },
        leftFirst: {
            borderTopLeftRadius: radius
        },
        leftLast: {
            borderBottomLeftRadius: radius
        },
        rightFirst: {
            borderTopRightRadius: radius
        },
        rightLast: {
            borderBottomRightRadius: radius
        }
    };
};
