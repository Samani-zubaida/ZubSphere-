import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    tech: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["Completed", "In Progress", "Planned"],
      default: "Completed",
    },
    github: {
      type: String,
      required: true,
    },
    demo: {
      type: String,
    },
    skills:[
        {
            type:String,
        },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;