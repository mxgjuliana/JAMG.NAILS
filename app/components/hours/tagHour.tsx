import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface TagProps {
    label: string;
    onSelect?: () => void;
    colorTag?: string;
}

const HourTag: React.FC<TagProps> = ({ label, onSelect, colorTag }) => {
    return (
        <TouchableOpacity onPress={onSelect}>
            <View style={[styles.tagContainer, { backgroundColor: colorTag && colorTag !== '' ? colorTag : '#f5f5f5' }]}>
                <Text style={[styles.tagText, {color: colorTag && colorTag !== '' ? 'white' : 'gray'}]}>{label}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tagContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginRight: 5,
        marginBottom: 5,
    },
    tagText: {
        color: 'gray',
        fontSize: 14,
        // marginRight: 5,
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    closeButton: {
        width: 16,
        height: 16,
        borderRadius: 8,
        // backgroundColor: 'rgb(255, 255, 255)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HourTag;
