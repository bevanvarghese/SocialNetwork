export default {
  palette: {
    primary: {
      light: '#011e28',
      main: '#14213D',
      dark: '#345561',
      contrastText: '#fff',
    },
    secondary: {
      light: '#155562',
      main: '#434d63',
      dark: '#4b94a3',
      contrastText: '#fff',
    },
  },
  toSpread: {
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: 'center',
    },
    image: {
      margin: '20px auto 20px auto',
      maxWidth: '120px',
      maxHeight: '120px',
    },
    //card: {
    //backgroundColor: '#ffffff',
    //},
    pageTitle: {
      margin: 'auto auto auto auto',
    },
    textField: {
      margin: '10px auto 10px auto',
    },
    button: {
      margin: '10px auto auto auto',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      margin: '10px',
    },
    progress: {
      position: 'absolute',
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4,
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20,
    },
    paper: {
      padding: 20,
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%',
        },
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle',
        },
        '& a': {
          color: '#14213D',
        },
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0',
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px',
      },
    },
  },
};
