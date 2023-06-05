import React from 'react'
import IcContact from '../icons/ic_contact.svg';
import IcContactFill from '../icons/ic_contactFull.svg';

import * as colors from '../../shared/theme/colors'
type IconContactProps={
    isActive: boolean
}

const IconContact = (props: IconContactProps) => {
    return props.isActive ? (
        <IcContactFill width='25' height='25' />
    ) : (
        <IcContact width='25' height='25' fill={'#828282'} />
    )
}

export default IconContact