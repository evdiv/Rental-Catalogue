import React from 'react'
import FeaturedProductsView from './FeaturedProductsView'
import OnSaleProductsView from './OnSaleProductsView'


const HomeView = () => {

    return (
        <>        
            <h3>Welcome to the Rental Page</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis dolor a pretium lobortis. 
                Nunc sollicitudin id augue sit amet malesuada. 
                Phasellus pretium nunc tortor, hendrerit suscipit orci suscipit in. 
                Aliquam vitae dui risus. Aenean ut quam arcu. Aliquam vel volutpat lacus. 
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                Aliquam diam felis, faucibus quis ex ac, finibus pellentesque mauris. 
                Fusce ullamcorper sapien laoreet lorem tristique sollicitudin. 
                Phasellus vitae lorem at metus lobortis gravida vitae vitae eros. 
                Aliquam tempus vestibulum tellus, ac scelerisque arcu.
            </p>

            <FeaturedProductsView />
            <OnSaleProductsView />
        </>
    )
}

export default HomeView

