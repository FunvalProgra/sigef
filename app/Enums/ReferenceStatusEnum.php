<?php

namespace App\Enums;

use App\Traits\EnumMethods;

enum ReferenceStatusEnum: int
{

    use EnumMethods;



    case WORK = 1;
    case STUDIES = 2;
    case NOT_CHURCH_MEMBER = 3;
    case FUTURE_MISSIONARY = 4;
    case HEALTH = 5;
    case GRADUATE = 6;
    case DUPLICATE = 7;
    case FEMALE = 8;
    case PENDING_CONTACT = 9;
    case NO_ANSWER = 10;
    case WRONG_NUMBER = 11;

    public function name(): string
    {

        return match ($this) {
            self::WORK => 'Trabajo',
            self::STUDIES => 'Estudios',
            self::NOT_CHURCH_MEMBER => 'No es miembro de la iglesia',
            self::FUTURE_MISSIONARY => 'Futuro misionero',
            self::HEALTH => 'Salud',
            self::GRADUATE => 'Es egresado',
            self::DUPLICATE => 'Duplicado',
            self::FEMALE => 'FILTRADA',
            self::WRONG_NUMBER => 'Número incorrecto',
            self::PENDING_CONTACT => 'Pendiente de contactar',
            self::NO_ANSWER => 'No responde',
        };
    }
}
