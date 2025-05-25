import User from "./UserModel.js";
import Note from "./NoteModel.js";

User.hasMany(Note, { foreignKey: 'userId' });
Note.belongsTo(User, { foreignKey: 'userId' });

(async () => {
    try {
        await db.sync({ alter: true });
        console.log("Semua tabel berhasil disinkronisasi.");
    } catch (err) {
        console.error("Gagal konek DB:", err);
    }
})();