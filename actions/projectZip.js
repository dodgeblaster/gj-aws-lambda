const file_system = require('fs')
const archiver = require('archiver')
const COMPRESSION_LEVEL = 9

module.exports = ({ location, target }) => {
    const archive = archiver('zip', { zlib: { level: COMPRESSION_LEVEL } })
    const stream = file_system.createWriteStream(target)
    return new Promise((resolve, reject) => {
        archive
            .directory(location, false)
            .on('error', err => reject(err))
            .pipe(stream)

        stream.on('close', () => resolve())
        archive.finalize()
    })
}