import React from 'react'
import IcChat from '../icons/ic_chat.svg';
import IcChatFill from '../icons/ic_chatFill.svg';

import * as colors from '../../shared/theme/colors'
type IconChatProps={
    isActive: boolean
}

const IconChat = (props: IconChatProps) => {
    return props.isActive ? (
        <IcChatFill width='25' height='25' />
    ) : (
        <IcChat width='25' height='25' />
    )
}

export default IconChat