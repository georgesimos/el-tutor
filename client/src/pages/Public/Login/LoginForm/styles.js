export default theme => ({
  form: {
    paddingLeft: '100px',
    paddingRight: '100px',
    paddingBottom: '125px',
    flexBasis: '700px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    color: theme.palette.common.contrastText,
    marginTop: theme.spacing(3)
  },
  socialLogin: {
    margin: theme.spacing(4, 0)
  },
  fields: {
    marginTop: theme.spacing(2)
  },
  textField: {
    width: '100%',
    '& + & ': {
      marginTop: theme.spacing(2)
    }
  },

  loginButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  register: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  registerUrl: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
});
