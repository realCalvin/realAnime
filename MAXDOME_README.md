# Welcome to your MaxDome Project

MaxDome seeks to provide a more seamless experience for Data Analytics, AI and ML from AWS. Here you will be able to work on data engineering & integration, data preparation and data science activities all from one experience.

## MaxDome Projects

Projects in MaxDome consist of everything you need to work on a particular data problem. They contain the notebooks and queries that make up the heart of your projects as well as environmental configurations and user permission attributes.

Artifacts (such as queries and notebooks) in MaxDome projects are committed to Git and almost everything is code-driven, giving you the ability to integrate MaxDome into your existing CI/CD workflows.

### Project Home

This page is your project Home. Most of the Home screen, just as in most Git tooling, is occupied by the file list and README.md (this document). Here in Home you can also work with project membership and view project details.

You can quickly switch between recent projects or view all projects using the drop-down on the top left of the screen.

### Code

Code is the core MaxDome IDE and is built on JupyterLab which should be instantly familiar to practitioners of modern data analytics, data science and machine learning.

### Compute

Compute shows the configured clusters, databases and execution endpoints configured for the project. During preview this is limited to Redshift, and Glue Interactive Sessions.

## Tools

MaxDome is designed to be flexible and approachable. We expect many different users of different preferences, disciplines and skill levels to be able to use MaxDome. Not every user needs or wants quick access to every tool.  The Tools drawer in the bottom left contains all the tools MaxDome supports today.

### Pinned tools

The most frequently used tools can be pinned to the left-nav toolbar for quick access.

## About the Sample Notebook

The `getting_started.ipynb` notebook covers the basics of using Glue Interactive Sessions within MaxDome for Spark and BigData use and is intended as an introduction to the notebook functionality for those not familiar with Glue PySpark.

### A Note about the sample notebooks

The sample notebooks keep input data size to a minimum as they are intended to showcases the MaxDome experience not push the boundaries of cluster scale. That being said, MaxDome can scale it's notebook's backends to process many terabytes of data. Feel free to experiment with any of the notebooks including increasing the size of the input data.

MaxDome notebooks are currently powered by Glue Interactive Sessions. You can find the documentation for it [here](https://docs.aws.amazon.com/glue/latest/dg/interactive-sessions-magics.html). This will help you experiment more with advanced Spark configurations.
