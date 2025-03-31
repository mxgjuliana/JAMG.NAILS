import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface TagProps {
    label: string;
    onRemove?: () => void;
    colorTag?: string
}

const ServiceTag: React.FC<TagProps> = ({ label, onRemove, colorTag }) => {
    return (
        <View style={[styles.tagContainer, {backgroundColor: colorTag && colorTag !== '' ? colorTag : '#94c87d'}]}>
            <Text style={styles.tagText}>{label}</Text>
            {onRemove && (
                <TouchableOpacity onPress={onRemove} style={styles.closeButton}>
                    <MaterialIcons name="close" size={14} color="white" />
                </TouchableOpacity>
            )}
        </View>
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
        color: 'white',
        fontSize: 14,
        marginRight: 5,
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

export default ServiceTag;
