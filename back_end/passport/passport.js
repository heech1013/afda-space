require('dotenv').config();
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);  // user -> deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => {  // serializeUser의 done의 인자 user를 전달 받음
    done(null, user);
  });

  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: 'localhost:3001/oauth',
    passReqToCallback: true  // callback에 req 매개변수 활용 가능
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
      
      // const user = await User.findOne({ authId: profile.id });
      // if (user) {
      //   return done(err, user);  // 로그인
      // }
      // await User.create({
      //   authId: profile.id,
      //   provider: 'kakao'
      // });
    } catch (e) {
      next(e);
    }
  }));
};