import prisma from "../config/config.js";

class Movies {
  // Menampilkan list data film serta pagination dengan 10 data per page
  static async getAll(req, res) {
    try {
      const { page } = req.query;
      const limit = 10;
      const skip = (page - 1) * limit;

      const data = await prisma.movies.findMany({
        skip: skip,
        take: limit,
      });
      res.status(200).json({
        message: "Sucessfully Get All Movies",
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Failed to Get All Movies",
      });
    }
  }

  // Input data film
  static async post(req, res) {
    try {
      const { title, genres, year } = req.body;

      if (!title || !genres || !year)
        return res.status(400).json({
          message: "Invalid input",
        });

      const existingMovies = await prisma.movies.findFirst({
        where: {
          title: title,
        },
      });

      if (existingMovies)
        return res.status(400).json({
          message: "Movies already exists",
        });

      const postMovies = await prisma.movies.create({
        data: {
          title,
          genres,
          year,
        },
      });

      res.status(200).json({
        message: "Success input new Movies",
        postMovies,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  //Edit data
  static async put(req, res) {
    try {
      const { id } = req.params;
      const { title, genres, year } = req.body;
      if (!title || !genres || !year)
        return res.status(400).json({
          message: "Wrong Input",
        });
      const updateMovies = await prisma.movies.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title,
          genres,
          year,
        },
      });
      res.status(200).json({
        message: "Updating Movies successfully",
        updateMovies,
      });
    } catch (error) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  // Delete data
  static async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).json({
          message: "Data not found",
        });
      const deleteMovies = await prisma.movies.delete({
        where: {
          id: parseInt(id),
        },
      });
      res.status(200).json({
        message: "Movies Deleted",
        deleteMovies,
      });
    } catch (error) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export default Movies;
