enum ResponseMessage {
    SUCCESS = "Success.",

    VALIDATION_FAIL = "Validation failed.",

    DUPLICATE_ID = "Duplicate Id.",

    SIGN_IN_FAIL = "Login information mismatch.",

    CERTIFICATION_FAIL = "Certification failed.",

    MAIL_FAIL = "Mail send failed",

    DATABASE_ERROR = "Database error.",

    WRONG_ROLE = "Wrong role.",

    MUSEUM_NOT_FOUND = "Museum not found.",

    ID_NOT_MATCHING = "User id not matching.",

    ID_NOT_FOUND = "Id not found.",

    DUPLICATE_MUSEUM_NAME = "Duplicated museum name.",

    ART_NOT_FOUND = "Art not found.",

    TTS_NOT_FOUND = "Tts not found.",

    QR_NOT_FOUND = "Qrcode not found",
};

export default ResponseMessage;