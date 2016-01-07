export default (req, res) => {
  req.session.user_id = null;
  req.session.save(() => {
    res.redirect(302, '/');
  });
}
