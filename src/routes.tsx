import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageDetails from './pages/OrphanageDetails';
import SelectMapPosition from './pages/CreateOrphanages/SelectMapPosition';
import OrphanageData from './pages/CreateOrphanages/OrphanageData';
import OnboardingHappy from './pages/Onboarding/OnboardingHappy';

import Header from './components/Header';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
	return (
			<NavigationContainer>
				<Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
					<Screen name="OnboardingHappy" component={OnboardingHappy} />
					<Screen name="OrphanagesMap" component={OrphanagesMap} />
					<Screen name="OrphanageDetails"
						component={OrphanageDetails}
						options={{
							headerShown: true,
							header: () => <Header title="Orfanato" showCancel={false} />
						}}
					/>
					<Screen name="OrphanageData"
						component={OrphanageData} 
						options={{
							headerShown: true,
							header: () => <Header title="Adicione um orfanato" />
						}} 
					/>
					<Screen
						name="SelectMapPosition" 
						component={SelectMapPosition} 
						options={{
							headerShown: true,
							header: () => <Header title="Adicione um orfanato" />
						}} 
					/>
				</Navigator>
			</NavigationContainer>
    )
}