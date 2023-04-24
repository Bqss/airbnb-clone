import AvenueModel from "./../models/AvenueModel.js";

class AvenueController{
    static async newAvenue(req, res){
        const { available, alamat, harga, deskripsi, judul, fasilitas, infoDasar, foto, kategori  } = req.body;
      
        if( available && foto && alamat && harga && deskripsi && judul && fasilitas && infoDasar  && kategori){
            try {
                await AvenueModel.create({
                    available,
                    kategori,
                    alamat,
                    harga,
                    deskripsi,
                    judul,
                    fasilitas,
                    infoDasar,
                    foto
                })
                res.sendStatus(201);
            } catch (error) {
                res.sendStatus(500);
            }
            
        }
        return res.sendStatus(400);
    }


    static async getAllAvenue (req, res) {
        try {
            const avenue = await AvenueModel.find();
            res.status(200).json(avenue);
        } catch (error) {
            res.sendStatus(500);
        }
    }

    static async deleteAvenue (req, res){
        const {aid} = req.params;
        try {
             await AvenueModel.findByIdAndDelete(aid);
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(500);
        }
    }
}

export default AvenueController;