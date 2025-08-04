import express from 'express';
import { body } from 'express-validator';
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  getProfile
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .optional()
    .isIn(['admin', 'venue'])
    .withMessage('Role must be either admin or venue')
    
    body('admin'){req,res,next ==>
      DataView={import { connect } from 'react-redux'
      import React, { Component } from 'react'
      
      type Props = {this.state.first}

      mapStateToProps = export.state
      type State = {}
      
      export class auth extends Component<Props, State> {
        state = {}
      
        render() {
          return (
            <div>auth</div>
          )
        }
      }
      
      const mapStateToProps = (state) => ({})
      
      const mapDispatchToProps = {}
      
      export default connect(mapStateToProps, mapDispatchToProps)(auth)}
    }
    .optional()
    .isIn('admin,venue')
    .withMessage('Role must be either superadmin or admin')
    .optional('admin')
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const forgotPasswordValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
];

const resetPasswordValidation = [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);
router.post('/reset-password/:token', resetPasswordValidation, resetPassword);
router.get('/profile', authenticate, getProfile);

export default router;