import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'venue';
  isActive: boolean;
  venueDetails?: {
    venueName: string;
    address: string;
    phone: string;
    capacity: number;
    amenities: string[];
    pricePerHour: number;
    commission: number;
  };
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'venue'],
    default: 'venue'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  venueDetails: {
    venueName: {
      type: String,
      required: function(this: IUser) { return this.role === 'venue'; }
    },
    address: {
      type: String,
      required: function(this: IUser) { return this.role === 'venue'; }
    },
    phone: {
      type: String,
      required: function(this: IUser) { return this.role === 'venue'; }
    },
    capacity: {
      type: Number,
      required: function(this: IUser) { return this.role === 'venue'; }
    },
    amenities: [{
      type: String
    }],
    pricePerHour: {
      type: Number,
      required: function(this: IUser) { return this.role === 'venue'; }
    },
    commission: {
      type: Number,
      default: 10,
      min: 0,
      max: 100
    }
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);